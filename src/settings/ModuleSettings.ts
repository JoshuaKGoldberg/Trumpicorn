import { IModuleSettings as IGameStartrModuleSettings } from "gamestartr/lib/IGameStartr";

import { Trumpicorn } from "../Trumpicorn";
import { GenerateCollisionsSettings } from "./Collisions";
import { GenerateEventsSettings } from "./Events";
import { GenerateGroupsSettings } from "./Groups";
import { GenerateInputSettings } from "./Input";
import { GenerateItemsSettings } from "./Items";
import { GenerateMapsSettings } from "./Maps";
import { GenerateObjectsSettings } from "./Objects";
import { GenerateQuadrantsSettings } from "./Quadrants";
import { GenerateRunnerSettings } from "./Runner";
import { GenerateSpritesSettings } from "./Sprites";
import { GenerateUISettings, IUserWrapprSettings } from "./Ui";

/**
 * Stored settings to generate modules.
 */
export interface IModuleSettings extends IGameStartrModuleSettings {
    /**
     * Settings regarding user-facing UI.
     */
    ui: IUserWrapprSettings;
}

/**
 * Generator for Trumpicorn settings.
 */
export class ModuleSettingsGenerator {
    /**
     * @param trump   A generating Trumpicorn instance.
     * @returns Settings for the Trumpicorn instance.
     */
    public generate(trumpicorn: Trumpicorn): IModuleSettings {
        return {
            collisions: GenerateCollisionsSettings(trumpicorn),
            events: GenerateEventsSettings(),
            groups: GenerateGroupsSettings(),
            input: GenerateInputSettings(trumpicorn),
            items: GenerateItemsSettings(),
            maps: GenerateMapsSettings(),
            objects: GenerateObjectsSettings(trumpicorn),
            quadrants: GenerateQuadrantsSettings(),
            runner: GenerateRunnerSettings(trumpicorn),
            sprites: GenerateSpritesSettings(),
            ui: GenerateUISettings()
        };
    }
}
