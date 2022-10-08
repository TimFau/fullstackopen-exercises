export const Filter = ({nameFilter, handleNameFilterChange}) => (
    <div>
        Filter shown with <input value={nameFilter} onChange={handleNameFilterChange} />
    </div>
)