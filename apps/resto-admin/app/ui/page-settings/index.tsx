import LanguageSelector from './components/language-selector';
import ThemeToggle from './components/theme-toggle';

export default function PageSettings() {
  return (
    <div className="absolute top-5 right-6 z-10">
      <ThemeToggle />
      <LanguageSelector />
    </div>
  );
}
