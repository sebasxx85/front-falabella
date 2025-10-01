import { CONFIG } from '../config/config';
import { fetchJson } from '../utils/fetchJson';
import type { GithubUser } from '../types/github';

export class GithubApiService {
  private readonly base = CONFIG.API_BASE.replace(/\/+$/, '');

  async getUser(username: string): Promise<GithubUser> {
    const url = `${this.base}/users/${encodeURIComponent(username)}`;
    return fetchJson<GithubUser>(url, { timeoutMs: CONFIG.API_TIMEOUT_MS });
  }
}

// singleton
export const githubApi = new GithubApiService();
