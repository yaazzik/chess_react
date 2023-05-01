import {Figure, FigureNames} from './Figure'
import {Colors} from 'models/Colors'
import {Cell} from 'models/Cell'
import blackLogo from 'assets/black-king.png'
import whiteLogo from 'assets/white-king.png'

export class King extends Figure {
  isFirstStep: boolean = true
  constructor (color: Colors, cell: Cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    this.name = FigureNames.KING
  }

  canMove (target: Cell): boolean {
    console.log(this.cell.board.getCell(0, this.color === Colors.WHITE ? 7 : 0).figure?.isFirstStep)
    if (!super.canMove(target)) { return false }
    const dx = Math.abs(this.cell.x - target.x)
    const dy = Math.abs(this.cell.y - target.y)
    if (this.isFirstStep && (
      (target.x === 2
        && this.cell.board.getCell(1, this.cell.y).isEmpty()
        && this.cell.board.getCell(2, this.cell.y).isEmpty()
        && this.cell.board.getCell(3, this.cell.y).isEmpty()
        && this.cell.board.getCell(0, this.color === Colors.WHITE ? 7 : 0).figure?.isFirstStep
      )
      || (target.x === 6
        && this.cell.board.getCell(5, this.cell.y).isEmpty()
        && this.cell.board.getCell(6, this.cell.y).isEmpty()
        && this.cell.board.getCell(7, this.color === Colors.WHITE ? 7 : 0).figure?.isFirstStep
      )
      )
      && (this.color === Colors.WHITE
        ? target.y === 7
        : target.y === 0
      )
    ) {
      return true
    }
    if (dx <= 1 && dy <= 1) {
      return true
    }
    return false
  }

  moveFigure (target: Cell) {
    if ((target.x === 2)
      && (this.color === Colors.WHITE
        ? target.y === 7
        : target.y === 0)
      && ((this.cell.x === 4)
        && (this.color === Colors.WHITE
        ? this.cell.y === 7
        : this.cell.y === 0))
    ) {
      super.moveFigure(target)
      this.cell.board.getCell(0, this.color === Colors.WHITE ? 7 : 0).moveFigure(this.cell.board.getCell(3, this.color === Colors.WHITE ? 7 : 0))
    }
    else if ((target.x === 6)
      && (this.color === Colors.WHITE
        ? target.y === 7
        : target.y === 0)
      && ((this.cell.x === 4)
        && (this.color === Colors.WHITE
          ? this.cell.y === 7
          : this.cell.y === 0))
    ) {
      super.moveFigure(target)
      this.cell.board.getCell(7, this.color === Colors.WHITE ? 7 : 0).moveFigure(this.cell.board.getCell(5, this.color === Colors.WHITE ? 7 : 0))
    }
    else super.moveFigure(target)
    this.isFirstStep = false
  }
}
