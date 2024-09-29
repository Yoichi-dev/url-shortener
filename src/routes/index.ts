import { Router } from 'express';
import dotenv from 'dotenv';
import type { Request, Response, NextFunction } from 'express';
import pool from '../lib/db/pool';
import sqlconstants from '../lib/db/sql';
import { AppLogger } from '../lib/log/logger';

dotenv.config();

const router: Router = Router();

const asyncWrapper = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next);
  }
};

router.post('/', (req: Request, res: Response) => {
  res.json({ title: 'hello world!' });
});

// URL短縮API
router.post('/shorten', asyncWrapper(async (req: Request, res: Response) => {
  const originalUrl: string = req.body.url;
  if (!originalUrl) {
    return res.status(400).json({ error: 'URLを入力してください' });
  }

  try {
    // 重複チェック
    const result = await pool.query(
      sqlconstants.shorten.select,
      [originalUrl]
    );

    if (result.rows.length > 0) {
      // 既存の短縮URLを返す
      const shortUrl: string = `${process.env.HOST_IP}/${result.rows[0].short_code}`;
      return res.json({ shortUrl });
    } else {
      // 新しい短縮コードを生成
      const shortCode: string = generateShortCode();

      await pool.query(
        sqlconstants.shorten.insert,
        [originalUrl, shortCode]
      );

      const shortUrl: string = `${process.env.HOST_IP}/${shortCode}`;
      res.json({ shortUrl });
    }
  } catch (err) {
    AppLogger.error(err);
    res.status(500).json({ error: 'サーバーエラー' });
  }
}));

router.get('/s/:code', async (req: Request, res: Response) => {
  const shortCode: string = req.params.code;

  try {
    const result = await pool.query(
      sqlconstants.geturl.select,
      [shortCode]
    );

    if (result.rows.length > 0) {
      const originalUrl: string = result.rows[0].original_url;
      res.json({ originalUrl });
    } else {
      res.status(404).json({ error: 'URLが見つかりません' });
    }
  } catch (err) {
    AppLogger.error('データベースエラー:', err);
    res.status(500).json({ error: 'サーバーエラーが発生しました' });
  }
});

router.get('/admin', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      sqlconstants.admin.select
    );

    const urls = result.rows.map((row) => ({
      id: row.id,
      originalUrl: row.original_url,
      shortUrl: `${process.env.HOST_IP}/${row.short_code}`,
      createdAt: row.created_at,
    }));

    res.json(urls);
  } catch (err) {
    AppLogger.error('データベースエラー:', err);
    res.status(500).json({ error: 'サーバーエラーが発生しました' });
  }
});

// 短縮コード生成関数
function generateShortCode(): string {
  return Math.random().toString(36).substring(2, 8);
}

export default router;
