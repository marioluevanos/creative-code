import {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CardProps, useBingoBoard } from './useBingBoard';
import { OptionOne } from './OptionOne';

function App() {
  const { getNewBoard, existingBoards } = useBingoBoard();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [board = [[]], setBoard] = useState<CardProps[][]>();
  const [option, setOption] = useState<'1' | '2'>('2');

  const onOptionChange = useCallback((event: BaseSyntheticEvent) => {
    setOption(event.target.value);
    localStorage.setItem('option', event.target.value);
  }, []);

  useEffect(() => {
    if (existingBoards.size === 0 && buttonRef.current) {
      const opt = localStorage.getItem('option') as typeof option | null;
      if (opt) {
        setOption(opt);
      }

      buttonRef.current.click();
    }
  }, [existingBoards]);

  return (
    <section>
      <aside className="cta ui">
        <button
          ref={buttonRef}
          onClick={() => setBoard(getNewBoard())}
          className="generate-board-cta"
        >
          Generate New Board
        </button>
        {Array.from({ length: 2 }, (_, i) => (
          <label key={i}>
            Option {i + 1}
            <input
              onChange={onOptionChange}
              key={i + 1}
              type="radio"
              name="option"
              value={i + 1}
              checked={option === String(i + 1)}
            />
          </label>
        ))}
      </aside>
      <div className="page" data-option={option}>
        {option === '2' ? (
          <>
            <img src="/bg.png" className="page-bg" />
            <header className="header">
              <svg
                className="baby-shower"
                width="560"
                height="560"
                viewBox="0 0 560 560"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path id="circlePath" d="M280,20 A260,260 0 1,1 279.99,20" />
                <text textAnchor="middle">
                  <textPath href="#circlePath" startOffset="50%">
                    Baby Shower
                  </textPath>
                </text>
              </svg>
              <div className="bingo">
                <h1>Bingo</h1>
                <p className="subtitle"> FIRST one TO GET 5 IN A ROW WINS!</p>
              </div>
            </header>
          </>
        ) : (
          <OptionOne className="page-bg" style={{}} />
        )}
        <div className="cards">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="card"
                data-row={String(rowIndex)}
                data-col={String(colIndex)}
              >
                <img src={cell.image} alt={cell.name} />
                <p className="name">{cell.name}</p>
              </div>
            )),
          )}
        </div>
        {option === '2' && <p className="footer">ISABELLA’S BABY SHOWER</p>}
      </div>
    </section>
  );
}

export default App;
