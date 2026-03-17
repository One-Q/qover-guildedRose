import { ItemUpdater } from "./itemUpdater";
import { Item } from "../gilded-rose";

export class AgedBrieUpdater extends ItemUpdater {
  protected updateQuality(item: Item): void {
    this.increaseQuality(item);

    if (item.sellIn < 0) {
      this.increaseQuality(item);
    }
  }
}
