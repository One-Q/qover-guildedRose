import { Item } from "@/gilded-rose";

export abstract class ItemUpdater {
  update(item: Item) {
    this.updateSellIn(item);
    this.updateQuality(item);
  }

  protected updateSellIn(item: Item) {
    item.sellIn--;
  }

  protected abstract updateQuality(item: Item): void;

  protected increaseQuality(item: Item) {
    if (item.quality < 50) item.quality++;
  }

  protected decreaseQuality(item: Item) {
    if (item.quality > 0) item.quality--;
  }
}
