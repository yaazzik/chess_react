import { render, screen, waitFor } from '@testing-library/react'
import LostFigures from '../LostFigures'
import { Figure, FigureNames } from '../../models/figures/chess/Figure'
import { Colors } from '../../models/Colors';
import { Cell } from '../../models/Cell';
import { Board } from '../../models/Board';
import { Pawn } from '../../models/figures/chess/Pawn';

describe('Lost figures board tests', () => {
    const testCell = new Cell(new Board, 9, 0, Colors.BLACK, null);
    const testTitle = 'Test Title';
    const onePawn: Figure[] = [new Pawn(Colors.WHITE, testCell)];
    const emptyFiguresArray: Figure[] = [];

    test('should render given title', () => {
        render(<LostFigures title={testTitle} figures={emptyFiguresArray}/>);
        expect(screen.getByTestId('Lost_Figures-title')).toHaveTextContent(testTitle);
    });

    test('should render one pawn in the list', () => {
        render(<LostFigures title={testTitle} figures={onePawn}/>);
        expect(screen.getByText('Пешка')).toBeInTheDocument();
    })
})