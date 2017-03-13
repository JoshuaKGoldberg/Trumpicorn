import { Physics } from "gamestartr/lib/components/Physics";
import { Scrolling } from "gamestartr/lib/components/Scrolling";
import { Things } from "gamestartr/lib/components/Things";
import { Utilities } from "gamestartr/lib/components/Utilities";
import { GameStartr } from "gamestartr/lib/GameStartr";
import { IProcessedSizeSettings } from "gamestartr/lib/IGameStartr";
import { IUserWrappr } from "userwrappr/lib/IUserWrappr";
import { UserWrappr } from "userwrappr/lib/UserWrappr";

import { Collisions } from "./components/Collisions";
import { Gameplay } from "./components/Gameplay";
import { Graphics } from "./components/Graphics";
import { Inputs } from "./components/Inputs";
import { Maintenance } from "./components/Maintenance";
import { Maps } from "./components/Maps";
import { Particles } from "./components/Particles";
import { IPlayer, Player } from "./components/Player";
import { Powerups } from "./components/Powerups";
import { Rainbows } from "./components/Rainbows";
import { Scoring } from "./components/Scoring";
import { Stars } from "./components/Stars";
import { Text } from "./components/Text";
import { IThing } from "./components/Things";
import { Trump } from "./components/Trump";
import { IModuleSettings, ModuleSettingsGenerator } from "./settings/ModuleSettings";

/**
 * Escape the Trump!
 */
export class Trumpicorn extends GameStartr {
    /**
     * Module settings passed to individual create* members.
     */
    public moduleSettings: IModuleSettings;

    /**
     * 
     */
    public userWrapper: IUserWrappr;

    /**
     * 
     */
    public collisions: Collisions<this>;

    /**
     * 
     */
    public gameplay: Gameplay<this>;

    /**
     * 
     */
    public graphics: Graphics<this>;

    /**
     * 
     */
    public inputs: Inputs<this>;

    /**
     * 
     */
    public maps: Maps<this>;

    /**
     * 
     */
    public maintenance: Maintenance<this>;

    /**
     * 
     */
    public particles: Particles<this>;

    /**
     * 
     */
    public player: Player<this>;

    /**
     * 
     */
    public powerups: Powerups<this>;

    /**
     * 
     */
    public rainbows: Rainbows<this>;

    /**
     * 
     */
    public scoring: Scoring<this>;

    /**
     * 
     */
    public stars: Stars<this>;

    /**
     * 
     */
    public text: Text<this>;

    /**
     * 
     */
    public trump: Trump<this>;

    /**
     * 
     */
    public players: IPlayer[];

    /**
     * 
     */
    public textDisplay: IThing[];

    /**
     * Resets the system components.
     */
    protected resetComponents(): void {
        this.collisions = new Collisions(this);
        this.gameplay = new Gameplay(this);
        this.graphics = new Graphics(this);
        this.inputs = new Inputs(this);
        this.maps = new Maps(this);
        this.maintenance = new Maintenance(this);
        this.physics = new Physics(this);
        this.particles = new Particles(this);
        this.player = new Player(this);
        this.powerups = new Powerups(this);
        this.scrolling = new Scrolling(this);
        this.rainbows = new Rainbows(this);
        this.scoring = new Scoring(this);
        this.stars = new Stars(this);
        this.text = new Text(this);
        this.things = new Things(this);
        this.trump = new Trump(this);
        this.utilities = new Utilities(this);
    }

    /**
     * Resets the system modules.
     * 
     * @param settings   Settings to reset an instance of the Trumpicorn class.
     */
    protected resetModules(settings: IProcessedSizeSettings): void {
        super.resetModules(settings);

        this.userWrapper = this.createUserWrapper(this.moduleSettings, settings);

        this.pixelDrawer.setThingArrays([
            this.groupHolder.getGroup("Scenery") as IThing[],
            this.groupHolder.getGroup("Character") as IThing[],
            this.groupHolder.getGroup("Solid") as IThing[],
            this.groupHolder.getGroup("Text") as IThing[],
            this.groupHolder.getGroup("Player") as IThing[],
            this.groupHolder.getGroup("Particle") as IThing[]
        ]);

        this.thingHitter.cacheChecksForType("Powerup", "Character");
        this.thingHitter.cacheChecksForType("Projectile", "Character");
        this.thingHitter.cacheChecksForType("Trump", "Character");
        this.thingHitter.cacheChecksForType("Player", "Player");
        this.thingHitter.cacheChecksForType("Rainbow", "Solid");

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

    /**
     * @param moduleSettings   Stored settings to generate modules.
     * @param settings   Settings to reset an instance of the FullScreenPokemon class.
     * @returns A new internal UserWrappr.
     */
    protected createUserWrapper(moduleSettings: IModuleSettings, _settings: IProcessedSizeSettings): IUserWrappr {
        return new UserWrappr({
            gameStarter: this,
            ...moduleSettings.ui
        });
    }
}
