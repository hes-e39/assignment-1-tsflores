

interface ButtonProps {
    active: boolean;
    isPaused: boolean;
    handleStart: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handlePauseResume: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleReset: (event: React.MouseEvent<HTMLButtonElement>) => void;
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


