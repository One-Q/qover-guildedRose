import { ItemUpdater } from "./itemUpdater";
import { Item } from "../gilded-rose";

export class BackstageUpdater extends ItemUpdater {
  protected updateQuality(item: Item): void {
    if (item.sellIn < 0) {
      item.quality = 0;
      return;
    }

    this.increaseQuality(item);

    if (item.sellIn < 10) {
      this.increaseQuality(item);
    }

    if (item.sellIn < 5) {
      this.increaseQuality(item);
    }
  }
}
