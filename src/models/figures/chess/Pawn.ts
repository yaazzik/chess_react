import {Figure, FigureNames} from './Figure'
import {Colors} from 'models/Colors'
import {Cell} from 'models/Cell'
import blackLogo from 'assets/black-pawn.png'
import whiteLogo from 'assets/white-pawn.png'
import {Queen} from "./Queen";

export class Pawn extends Figure {
  isFirstStep: boolean = true

  constructor (color: Colors, cell: Cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    this.name = FigureNames.PAWN
  }

  canMove (target: Cell): boolean {
    if (!super.canMove(target)) { return false }
    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
    const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2

    if (
      target.y === this.cell.y + direction
      && target.x === this.cell.x
      && target.isEmpty()
    ) {
      return true
    }

    if (this.isFirstStep
      && target.y === this.cell.y + firstStepDirection
      && this.cell.board.getCell(this.cell.x,this.cell.y + direction).isEmpty()
      && target.x === this.cell.x
      && target.isEmpty()
    ) {
      return true
    }

    if (target.y === this.cell.y + direction &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      this.cell.isEnemy(target)) {
      return true
    }

    return false
  }

  moveFigure (target: Cell) {
    if (target.y === (this.color === Colors.WHITE ? 0 : 7)) {
      super.moveFigure(target)
      this.cell.figure = new Queen(this.color, target)
    }
    else super.moveFigure(target)
    this.isFirstStep = false
  }
}

// test
