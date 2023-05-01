import { render, screen, waitFor } from '@testing-library/react'
import Timer from '../Timer'
import { Player } from '../../models/Player'
import { Colors } from '../../models/Colors'
import { setTimeout } from 'timers/promises'

describe('Timer tests', () => {
    const whitePlayer = new Player(Colors.WHITE);
    const blackPlayer = new Player(Colors.BLACK);

    describe('Rendering tests', () => {
        beforeEach(() => {
            render(<Timer currentPlayer={whitePlayer} restart={() => {}}/>)
        });
        
        test('should render restart button', () => {
            const restartButton = screen.getByTestId('Restart_Button');
            expect(restartButton).toBeInTheDocument();
        });

        test('should render white timer', () => {
            const whiteTimer = screen.getByTestId('White_Timer');
            expect(whiteTimer).toBeInTheDocument(); 
        });

        test('should render black timer', () => {
            const blackTimer = screen.getByTestId('Black_Timer');
            expect(blackTimer).toBeInTheDocument(); 
        });
    });

    describe('Timers tests', () => {
        test('should render victory message if white`s time is up', async () => {
            render(<Timer currentPlayer={whitePlayer} restart={() => {}} playersTime={3}/>);
            await waitFor(() => {
                expect(screen.getByTestId('Black_Timeout_Win')).toBeInTheDocument()
            }, {timeout: 4000});
        });

        test('should render victory message if black`s time is up', async () => {
            render(<Timer currentPlayer={blackPlayer} restart={() => {}} playersTime={3}/>);
            await waitFor(() => {
                expect(screen.getByTestId('White_Timeout_Win')).toBeInTheDocument()
            }, {timeout: 4000});
        });
    });
})