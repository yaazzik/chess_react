import { test, expect } from '@playwright/test';

test.describe('Тесты доски', () => {
  const restartBtn = 'button.btn';
  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('load');
  });

  test('TC-1: Валидация цветов клеток', async ({ page }) => {
    let className = 'cell white ';
    for (let cellNumber = 1; cellNumber < 65; cellNumber++) {
      await expect(page.locator(`div.board div:nth-child(${cellNumber})`)).toHaveAttribute('class', className);
      if (cellNumber % 8 == 0) {
        continue;
      }
      if (className === 'cell white '){
        className = 'cell black ';
      }
      else className = 'cell white ';
    }
  });

  test('TC-2: Валидация поля текущего игрока', async ({ page }) => {
    let cellNumber = 49;
    const cellLocator = `div:nth-child(${cellNumber})`;
    for (cellNumber; cellNumber < 65; cellNumber ++) {
      await page.locator(cellLocator).click();
      await expect(page.locator(cellLocator)).toHaveAttribute('class', /selected/);
    }
  });
  
  test('TC-3: Валидация точек цветовой подсказки', async ({ page }) => {
    await test.step('Проверка ладей', async () => {
      const cellsArray = [1, 8, 57, 64];
      for (const cell of cellsArray) {
        await page.locator(`div.board div:nth-child(${1})`).click();

        expect(await page.locator('div.available').count()).toBe(0);
      }
    })
    await test.step('Проверка коней', async () => {
      const cellsArray = [58, 2];

      await page.locator(restartBtn).click();
      await page.waitForLoadState('load');

      for (const cell of cellsArray) {
        if (cell < 10) {
          await page.locator(`div.board div:nth-child(56)`).click();
          await page.locator(`div.board div:nth-child(48)`).click();
          await page.locator(`div.board div:nth-child(${cell})`).click();
          await page.waitForLoadState('load');

          expect(await page.locator(`div:nth-child(${cell + 15}) .available`).isVisible()).toBe(true);
          expect(await page.locator(`div:nth-child(${cell + 17}) .available`).isVisible()).toBe(true);
        } else {
          await page.locator(`div.board div:nth-child(${cell})`).click();
          await page.waitForLoadState('load');

          expect(await page.locator(`div:nth-child(${cell - 15}) .available`).isVisible()).toBe(true);
          expect(await page.locator(`div:nth-child(${cell - 17}) .available`).isVisible()).toBe(true);
        }
      }
    })
    await test.step('Проверка слонов', async () => {
      const cellsArray = [3, 6, 59, 62];

      await page.locator(restartBtn).click();
      await page.waitForLoadState('load');

      for (const cell of cellsArray) {
        await page.locator(`div.board div:nth-child(${cell})`).click();
        expect(await page.locator('div.available').count()).toBe(0);
      }
    })
    await test.step('Валидация королев', async () => {
      const cellsArray = [4, 61];

      await page.locator(restartBtn).click();
      await page.waitForLoadState('load');

      for (const cell of cellsArray) {
        await page.locator(`div.board div:nth-child(${cell})`).click();
        expect(await page.locator('div.available').count()).toBe(0);
      }
    })
    await test.step('Валидация королей', async () => {
      const cellsArray = [5, 60];

      await page.locator(restartBtn).click();
      await page.waitForLoadState('load');

      for (const cell of cellsArray) {
        await page.locator(`div.board div:nth-child(${cell})`).click();
        expect(await page.locator('div.available').count()).toBe(0);
      }
    })
    await test.step('Валидация пешек', async () => {
      const cellsArray = [49, 9];

      await page.locator(restartBtn).click();
      await page.waitForLoadState('load');

      for (const cell of cellsArray) {
        if (cell > 16) {
          await page.locator(`div.board div:nth-child(${cell})`).click();
          await page.waitForLoadState('domcontentloaded');
          expect(await (page.locator(`div:nth-child(${cell - 8}) div.available`).isVisible())).toEqual(true);
          expect(await (page.locator(`div:nth-child(${cell - 16}) div.available`).isVisible())).toEqual(true);
        } else {
          await page.locator(`div.board div:nth-child(56)`).click();
          await page.locator(`div.board div:nth-child(48)`).click();
          await page.locator(`div.board div:nth-child(${cell})`).click();
          await page.waitForLoadState('domcontentloaded');
          expect(await (page.locator(`div:nth-child(${cell + 8}) div.available`).isVisible())).toEqual(true);
          expect(await (page.locator(`div:nth-child(${cell + 16}) div.available`).isVisible())).toEqual(true);
        }
      }
    })
  })

  test('TC-4: Перемещение фигур по полю', async ({ page }) => {
    const pawnCell = 56;
    const cellsToClick = [48, 40];
    for (const cell of cellsToClick) {
      await page.locator(`div:nth-child(${pawnCell})`).click();
      await page.locator(`div:nth-child(${cell})`).click();
      await expect(page.locator(`div:nth-child(${cell}) img`)).toBeVisible();
      expect(await page.locator(`div:nth-child(${pawnCell}) img`).count()).toBe(0);
      await page.locator(restartBtn).click();
    }
  })

  test('TC-5:Убийство вражеской фигуры', async ({ page }) => {
    let whitePawnStartCell = 49;
    let blackPawnStartCell = 10;
    const capturedWhiteCells = await page.locator('div.white img').count();

    await page.locator(`div:nth-child(${whitePawnStartCell})`).click();
    await page.locator(`div:nth-child(${whitePawnStartCell - 16})`).click();

    await page.locator(`div:nth-child(${blackPawnStartCell})`).click();
    await page.locator(`div:nth-child(${blackPawnStartCell + 16})`).click();

    await page.locator(`div:nth-child(${whitePawnStartCell - 16})`).click();
    await page.locator(`div:nth-child(${blackPawnStartCell + 16})`).click();

    expect(await page.locator('div.white img').count()).toBeLessThan(capturedWhiteCells);
    expect(await page.locator('div.lost div').count()).toBe(1);
  })

  test('TC-6: TC-6: Реакция приложения на попытку движения в неверном направлении', async ({ page }) => {
    let whitePawnStartCell = 49;

    await page.locator(`div.board div:nth-child(${whitePawnStartCell})`).click();
    await page.locator(`div.board div:nth-child(15)`).click();

    await expect(page.locator(`div.board div:nth-child(${whitePawnStartCell}) img`)).toBeVisible();
    await expect(page.locator(`div.board div:nth-child(${whitePawnStartCell}).selected`)).toBeVisible();
    await expect(page.locator(`div.board div:nth-child(${whitePawnStartCell - 8}) div.available`)).toBeVisible();
    await expect(page.locator(`div.board div:nth-child(${whitePawnStartCell - 16}) div.available`)).toBeVisible();
  })
})
