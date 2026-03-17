import { ItemUpdater } from "@/updaters/itemUpdater";
import { Item } from "@/gilded-rose";

export class SulfurasUpdater extends ItemUpdater {
  updateQuality(item: Item): void {
    // Sulfuras ne change jamais
  }
}
