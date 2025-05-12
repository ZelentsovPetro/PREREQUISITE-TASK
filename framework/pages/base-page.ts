import { Page } from "@playwright/test";
import {environments} from "../data/environment";

export abstract class BasePage {
  readonly url: string;

  protected constructor(protected readonly page: Page) {
    this.page = page;
    this.url = environments.TEST;
  }

  async goto() {
    await this.page.goto(this.url, { waitUntil: "networkidle" });
  }
}
