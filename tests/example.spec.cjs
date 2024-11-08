import { test, expect } from '@playwright/test';

test('Redux anecdotes', async ({ page }) => {
  await test.step('front page can be opened', async () => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Anecdotes' })).toBeVisible();

    await expect(page.getByText('If it hurts, do it more often')).toBeVisible();
  });
});
