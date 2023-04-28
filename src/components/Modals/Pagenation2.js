function Pagination({ pages, activePage, setPage }) {
  return (
    <div
      style={{ display: 'flex', marginTop: '12px', justifyContent: 'center' }}
    >
      {pages.map((page) => (
        <div
          key={page}
          style={{
            height: '30px',
            width: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            marginRight: '12px',
            cursor: 'pointer',
            backgroundColor: activePage === page ? '#FF4840' : '#F4F4F4',
            color: activePage === page ? 'white' : '#BDBDBD',
          }}
          onClick={() => setPage(page)}
        >
          {page}
        </div>
      ))}
    </div>
  );
}

export default Pagination;
