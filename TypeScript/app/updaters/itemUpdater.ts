import { Item } from "../gilded-rose";
import { MAX_QUALITY, MIN_QUALITY } from "../utils/constants";

export abstract class ItemUpdater {
  update(item: Item) {
    this.updateSellIn(item);
    this.updateQuality(item);
  }

  protected updateSellIn(item: Item) {
    item.sellIn--;
  }

  protected updateQuality(item: Item): void {}

  protected increaseQuality(item: Item) {
    if (item.quality < MAX_QUALITY) item.quality++;
  }

  protected decreaseQuality(item: Item) {
    if (item.quality > MIN_QUALITY) item.quality--;
  }
}
