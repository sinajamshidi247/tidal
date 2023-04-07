import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SelectonCardLoader = ()=>{
    return (
        <div className="card">
            <Skeleton height={200} />
            <Skeleton height={20} style={{ marginTop: '10px' }} />
        </div>
    );
};

export default SelectonCardLoader;