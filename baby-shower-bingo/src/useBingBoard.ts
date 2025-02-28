import { useState, useCallback } from 'react';

export type CardProps = {
  name: string;
  image: string;
  className?: 'red';
};

export const data: CardProps[] = [
  {
    name: 'Jakub',
    image: '/Jakub.webp',
  },
  {
    name: 'Carmen',
    image: '/Carmen.avif',
  },
  {
    name: 'Rattle',
    image: '/Rattle.webp',
  },
  {
    name: 'Ultrasound',
    image: '/Ultrasound.webp',
  },
  {
    name: 'Baby Wipes',
    image: '/Baby Wipes.svg',
  },
  {
    name: 'Onesie',
    image: '/Onesie.svg',
  },
  {
    name: 'Diaper',
    image: '/Diaper.png',
  },
  {
    name: 'Crib',
    image: '/Crib.webp',
  },
  {
    name: 'Pacifier',
    image: '/Pacifier.png',
  },
  {
    name: 'Stroller',
    image: '/Stroller.png',
  },
  {
    name: 'Baby Feet',
    image: '/Baby Feet.webp',
  },
  {
    name: 'Bath Time',
    image: '/Bath Time.webp',
  },
  {
    name: 'Teddy',
    image: '/Teddy.webp',
  },
  {
    name: 'Stork',
    image: '/Stork.webp',
  },
  {
    name: 'Hairbow',
    image: '/Hairbow.svg',
  },
  {
    name: 'Booties',
    image: '/Booties.webp',
  },
  {
    name: 'Safety Pin',
    image: '/Safety Pin.webp',
  },
  {
    name: 'Isabella',
    image: '/Isabella.webp',
  },
  {
    name: 'Lullaby',
    image: '/Lullaby.webp',
  },
  {
    name: 'Blanket',
    image: '/Blanket.webp',
  },
  {
    name: 'Family',
    image: '/Family.webp',
  },
  {
    name: 'Highchair',
    image: '/Highchair.png',
  },
  {
    name: 'Bib',
    image: '/Bib.webp',
  },
  {
    name: 'Bottle',
    image: '/Bottle.webp',
  },
  {
    name: 'FREE',
    image: '/FREE.png',
  },
];
function generateUniqueBoard(existingBoards: Set<string>): CardProps[][] {
  const board: CardProps[][] = Array.from({ length: 5 }, () =>
    Array(5).fill(null),
  );
  const shuffledWords = data
    .filter(item => item.name !== 'FREE')
    .sort(() => Math.random() - 0.5);
  let index = 0;

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (row === 2 && col === 2) {
        board[row][col] = data.find(item => item.name === 'FREE')!;
      } else {
        board[row][col] = shuffledWords[index];
        index++;
      }
    }
  }

  const boardString = board
    .map(row => row.map(cell => cell.name).join(','))
    .join(';');
  if (existingBoards.has(boardString)) {
    return generateUniqueBoard(existingBoards);
  }
  existingBoards.add(boardString);
  return board;
}

export function useBingoBoard() {
  const [existingBoards, setExistingBoards] = useState<Set<string>>(new Set());
  const [allBoards, setAllBoards] = useState<Record<string, CardProps[][]>>({});

  const getNewBoard = useCallback((): CardProps[][] => {
    const newBoard = generateUniqueBoard(existingBoards);
    setExistingBoards(
      new Set(existingBoards).add(
        newBoard.map(row => row.map(cell => cell.name).join(',')).join(';'),
      ),
    );

    setAllBoards(prev => {
      prev[existingBoards.size] = newBoard;
      return Object.assign({}, prev);
    });

    return newBoard;
  }, [existingBoards]);

  return { getNewBoard, allBoards, existingBoards };
}
