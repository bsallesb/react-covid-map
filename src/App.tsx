import Header from './components/Header';
import Map from './components/Map';
import RangePicker from './components/RangePicker';
import { RecordsProvider } from './hooks/RecordsContext';

const App: React.FC = () => {
    return (
        <RecordsProvider>
            <Header />
            <RangePicker />
            <Map />
        </RecordsProvider>
    );
};

export default App;
