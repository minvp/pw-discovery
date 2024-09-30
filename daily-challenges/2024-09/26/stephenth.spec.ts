function calculateTip(billAmount: number, tipPercentage: number) {
    return billAmount * tipPercentage / 100;
}
console.log(`tip 15% of 100 is ${calculateTip(100, 15)}`);


import { test, expect } from '@playwright/test';


test('2024-09 day 26', async ({ page }) => {
    await page.goto("https://material.playwrightvn.com/021-import-export.html");

    // Filter by class A4
    await page.selectOption('#filterCriteria', 'Lớp');
    await page.fill("#searchInput", "A4");
    await page.click("#searchButton");

    // Verify there is only 1 visible row, which is class *A4
    let rows = page.locator('#studentTable tbody tr');
    const totalRow = await rows.count();

    let visibleCount = 0;
    for (let i = 0; i < totalRow; i++) {
        const row = rows.nth(i);
        if (await row.isVisible()) {
            const classCell = row.locator('td').nth(2);
            await expect(classCell).toContainText('A4');
            visibleCount++;
        }
    }
    expect(visibleCount).toBe(1);

    // Clear the filter
    await page.fill("#searchInput", "");
    await page.click("#searchButton");

    // Verify all rows are visible back
    rows = page.locator('#studentTable tbody tr');
    visibleCount = 0;
    for (let i = 0; i < totalRow; i++) {
        const row = rows.nth(i);
        if (await row.isVisible()) {
            visibleCount++;
        }
    }
    expect(visibleCount).toBe(totalRow);
})
