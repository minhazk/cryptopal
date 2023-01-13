import SkeletonThread from '../Thread/SkeletonThread';

const SkeletonList = ({ count }) => {
    return Array.from({ length: count }).map((_n, i) => {
        return <SkeletonThread key={i} />;
    });
};

export default SkeletonList;
