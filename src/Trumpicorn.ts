import { GameStartr } from "gamestartr/lib/GameStartr";
import { IProcessedSizeSettings } from "gamestartr/lib/IGameStartr";
import { Things } from "gamestartr/lib/components/Things";
import { Scrolling } from "gamestartr/lib/components/Scrolling";
import { Physics } from "gamestartr/lib/components/Physics";
import { Utilities } from "gamestartr/lib/components/Utilities";

import { Collisions } from "./components/Collisions";
import { Gameplay } from "./components/Gameplay";
import { Graphics } from "./components/Graphics";
import { Maps } from "./components/Maps";
import { Maintenance } from "./components/Maintenance";
import { IPlayer, Player } from "./components/Player";
import { Stars } from "./components/Stars";
import { IThing } from "./components/Things";
import { IModuleSettings, ModuleSettingsGenerator } from "./settings/ModuleSettings";

/**
 * A crowd of Trump heads has appeared all across the sky! It's up to you to stomp them out.
 */
export class Trumpicorn extends GameStartr {
    public collisions: Collisions<this>;

    public gameplay: Gameplay<this>;

    public graphics: Graphics<this>;

    public maps: Maps<this>;

    public maintenance: Maintenance<this>;

    public player: Player<this>;

    public stars: Stars<this>;

    public players: IPlayer[];

    /**
     * Resets the system components.
     */
    protected resetComponents(): void {
        this.collisions = new Collisions(this);
        this.gameplay = new Gameplay(this);
        this.graphics = new Graphics(this);
        this.maps = new Maps(this);
        this.maintenance = new Maintenance(this);
        this.physics = new Physics(this);
        this.player = new Player(this);
        this.scrolling = new Scrolling(this);
        this.stars = new Stars(this);
        this.things = new Things(this);
        this.utilities = new Utilities(this);
    }

    /**
     * Resets the system modules.
     * 
     * @param settings   Settings to reset an instance of the Trumpicorn class.
     */
    protected resetModules(settings: IProcessedSizeSettings): void {
        super.resetModules(settings);

        this.pixelDrawer.setThingArrays([
            this.groupHolder.getGroup("Scenery") as IThing[],
            this.groupHolder.getGroup("Text") as IThing[],
            this.groupHolder.getGroup("Character") as IThing[],
            this.groupHolder.getGroup("Player") as IThing[],
            this.groupHolder.getGroup("Particle") as IThing[]
        ]);

        this.thingHitter.cacheChecksForType("Player", "Player");

        this.players = [];
        this.gameplay.gameStart();
    }

    /**
     * Creates the settings for individual modules.
     * 
     * @param settings   Settings to reset an instance of the FullScreenPokemon class.
     * @returns Settings for individual modules.
     */
    protected createModuleSettings(settings: IProcessedSizeSettings): IModuleSettings {
        return {
            ...new ModuleSettingsGenerator().generate(this),
            ...settings.moduleSettings
        };
    }
}
