import IconToggle from '../Header/IconToggle';

export const Header = ({ toggleSidebar }) => {
  return (
    <header className="shadow-2xl p-4">
      <div className="container mx-auto flex items-center justify-between">
        <IconToggle onClick={toggleSidebar} />
      </div>
    </header>
  );
};
