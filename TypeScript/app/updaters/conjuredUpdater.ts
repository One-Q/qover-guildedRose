import { ItemUpdater } from "./itemUpdater";
import { Item } from "../gilded-rose";

export class ConjuredUpdater extends ItemUpdater {
  protected updateQuality(item: Item): void {
    this.decreaseQuality(item);
    this.decreaseQuality(item);

    if (item.sellIn < 0) {
      this.decreaseQuality(item);
      this.decreaseQuality(item);
    }
  }
}
