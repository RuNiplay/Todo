import '../MainComponentsCSS/LeftBlock.css'

const LeftBlock = () => {
  return (
    <>
    <div className="sidebar">
      <div className="profile-section">
        <h3>Профиль</h3>
          <div className="avatar"></div>
          <div>
            <div><strong>Eldar</strong></div>
            <div className="status">online</div>
          </div>
          </div>

      <div className="nav-section">
        <h3>Навигация</h3>
        <div className="nav-items">
          <div className="nav-item active"> Все доски</div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LeftBlock;