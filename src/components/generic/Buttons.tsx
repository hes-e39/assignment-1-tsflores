
interface ButtonProps {
    active: boolean;
    isPaused?: boolean;
	handleStart?: (event: React.MouseEvent<HTMLDivElement>) => void;
    handlePauseResume?: (event: React.MouseEvent<HTMLDivElement>) => void;
    handleReset?: (event: React.MouseEvent<HTMLDivElement>) => void;
	handleSettings?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const ButtonOptions = ({active, isPaused, handleStart, handlePauseResume, handleReset}: ButtonProps) => {
    
    const StartButton = (
		<div className="btn btn-one btn-start"
			onClick={handleStart}>  
			Start
		</div>
	);

	const ActiveButtons = (
		<div className="btn-grp">
			<div className="btn btn-two"
				onClick={handleReset}>
				Reset
			</div>
			<div className="btn btn-one"
				onClick={handlePauseResume}>
				{isPaused ? "Resume" : "Pause"}
			</div>
		</div>
	);

	return (
		<div className="Control-Buttons">
			<div>{active ? ActiveButtons : StartButton}</div>
		</div>
	);
};

interface SettingsButton {
		showSettings: boolean;
		handleSettings?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

//SVG from heroicons.com 
export const SettingsButton = ({showSettings, handleSettings}: SettingsButton) => {
	return (
	  <div className="with-text" onClick={handleSettings}>
		{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
		<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
		  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
		</svg>
		{showSettings ? 'Exit' : 'Settings'}
	  </div>
	);
  }
  

  
  


