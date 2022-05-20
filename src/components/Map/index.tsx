import { useCallback, useState } from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
} from 'react-simple-maps';
import { useNavigate } from 'react-router-dom';

import ReactTooltip from 'react-tooltip';
import { useRecords } from '../../hooks/RecordsContext';
import Table from '../Table';

import { MapContainer } from './styles';

import topography from '../../assets/world-map.json';

type GeoType = {
    rsmKey: string;
    properties: {
        NAME_LONG: string;
    };
};

type GeographiesChildrenArgumentType = {
    geographies: GeoType[];
};

const defaultColor = '#d6d6d6';
const activeColor = '#e67e22';

const Map: React.FC = () => {
    const [tooltipContent, setTooltipContent] = useState('');

    const { location, setLocation, getRawRecords } = useRecords();
    const navigate = useNavigate();

    const handleMouseIn = useCallback((geo: GeoType) => {
        const { NAME_LONG: name } = geo.properties;

        setTooltipContent(name);
    }, []);

    const handleMouseOut = useCallback(() => setTooltipContent(''), []);

    const handleGeoClick = useCallback(
        (geo: GeoType) => {
            const { NAME_LONG: name } = geo.properties;
            setLocation(name);
            getRawRecords(name);
            navigate(`/${name.toLocaleLowerCase()}`);
        },
        [setLocation, getRawRecords, navigate]
    );

    const getCountryStyle = useCallback(
        (geo: GeoType) => {
            const { NAME_LONG: name } = geo.properties;
            const isActive = location === name;

            return {
                default: {
                    fill: isActive ? activeColor : defaultColor,
                    outline: 'none',
                },
                hover: {
                    fill: activeColor,
                    outline: 'none',
                },
            };
        },
        [location]
    );

    return (
        <section className="mb-3">
            <MapContainer>
                <div className="container mb-4">
                    <ComposableMap data-tip="">
                        <ZoomableGroup>
                            <Geographies geography={topography}>
                                {({
                                    geographies,
                                }: GeographiesChildrenArgumentType) =>
                                    geographies.map(geo => (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            style={getCountryStyle(geo)}
                                            onMouseEnter={() =>
                                                handleMouseIn(geo)
                                            }
                                            onMouseLeave={handleMouseOut}
                                            onClick={() => handleGeoClick(geo)}
                                        />
                                    ))
                                }
                            </Geographies>
                        </ZoomableGroup>
                    </ComposableMap>
                    <ReactTooltip>{tooltipContent}</ReactTooltip>
                </div>
                <Table />
            </MapContainer>
        </section>
    );
};

export default Map;
