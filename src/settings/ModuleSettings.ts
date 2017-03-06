import { IModuleSettings as IGameStartrModuleSettings } from "gamestartr/lib/IGameStartr";

import { Trumpicorn } from "../Trumpicorn";
import { GenerateCollisionsSettings } from "./Collisions";
import { GenerateGroupsSettings } from "./Groups";
import { GenerateMapsSettings } from "./Maps";
import { GenerateObjectsSettings } from "./Objects";
import { GenerateRunnerSettings } from "./Runner";
import { GenerateSpritesSettings } from "./Sprites";

/**
 * Stored settings to generate modules.
 */
export interface IModuleSettings extends IGameStartrModuleSettings { }

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
            groups: GenerateGroupsSettings(),
            maps: GenerateMapsSettings(),
            objects: GenerateObjectsSettings(trumpicorn),
            runner: GenerateRunnerSettings(trumpicorn),
            sprites: GenerateSpritesSettings()
        };
    }
}
