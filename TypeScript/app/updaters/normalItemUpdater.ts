import { ItemUpdater } from "@/updaters/itemUpdater";
import { Item } from "@/gilded-rose";

export class NormalItemUpdater extends ItemUpdater {
  protected updateQuality(item: Item): void {
    this.decreaseQuality(item);

    if (item.sellIn < 0) {
      this.decreaseQuality(item);
    }
  }
}
