import React, { FC } from 'react'
import { Figure } from '../models/figures/chess/Figure'

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div className="lost">
      <h3 data-testid = "Lost_Figures-title">{title}</h3>
      {figures.map(figure =>
      <div className="lostFigure" key={figure.id} data-testid="Lost_Figures">
          {figure.logo && <img width={20} height={20} src={figure.logo} alt={figure.name} data-testid="Lost_Figure"/>} {figure.name}
      </div>
      )}
    </div>
  )
}

export default LostFigures
