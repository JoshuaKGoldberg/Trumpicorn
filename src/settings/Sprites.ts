import { ISpritesModuleSettings } from "gamestartr/lib/IGameStartr";

/* tslint:disable max-line-length */

/**
 * @returns Sprite settings for a Trumpicorn instance.
 */
export function GenerateSpritesSettings(): ISpritesModuleSettings {
    "use strict";

    return {
        spriteWidth: "spritewidth",
        spriteHeight: "spriteheight",
        flipVert: "flip-vert",
        flipHoriz: "flipped",
        paletteDefault: [
            [0, 0, 0, 0],
            // Grayscales (0-5)
            [255, 255, 255, 255],
            [0, 0, 0, 255],
            [188, 188, 188, 255],
            [116, 116, 116, 255],
            [70, 70, 70, 255],
            // Beiges (6-9)
            [238, 225, 218, 255],
            [218, 196, 197, 255],
            [175, 168, 186, 255],
            [139, 135, 171, 255],
            // Purples & pinks (10-15)
            [218, 112, 193, 255],
            [203, 112, 218, 255],
            [164, 112, 218, 255],
            [234, 174, 220, 255],
            [195, 50, 161, 255],
            [164, 112, 218, 255],
            // Blues (16-18)
            [94, 131, 236, 255],
            [124, 112, 218, 255],
            [130, 174, 200, 255],
            // Green (19)
            [67, 107, 83, 255],
            // Browns (20-21)
            [105, 56, 7, 255],
            [77, 49, 14, 255],
            // Rainbow colors (22-28)
            [255, 0, 14, 255],
            [255, 120, 0, 255],
            [255, 255, 0, 255],
            [0, 255, 0, 255],
            [0, 168, 255, 255],
            [104, 59, 178, 255],
            [92, 2, 138, 255]
        ],
        filters: {},
        library: {
            Character: {
            },
            Player: {
                normal: "p[00,01,02,05,06,07,08,09,10,11,13,14,15,16,17,18,22]x0043,03x0035,0303x004,0303x0032,030300030503000000030903x0031,031010030306030000031203x0031,031008081003070300031403x0031,031008081110030505031403x0031,031008081111030404040603x0031,03100808110308030403030403x0030,031008081103050304020403040403x0028,03100808081103040404050216020403x0028,0310081103110304050604040202040403x0013,x035,x009,0308111103080304050706040404060603x0012,0305x044,x039,060311030403040405030307050404040603x0010,0306x044,05050606070707060605050308030404040507030003070503040403x009,030306x045,x0511,03x044,05070300000307060503x0010,030605x048,x054,x048,05050703000000030303x0011,030605x0420,05060703x0017,03060504040503040505x046,05050504040506050603x0018,0306050504040703x055,04050506060505040506060603x0018,0306060504040703x064,0505060607030505040403060703x0018,0303070604040603x074,06060607070305050405030703x0019,03030706050406030303x077,0306050404030703x0021,0306050403070300x038,07060504030603x0021,03060405030703x009,03060504030603x0021,030405030703x0010,030604030703x0021,030605030703x0011,030604030703x0021,030606030703x0011,030604030703x0022,0306030703x0011,030706030603x0022,0306030603x0011,030706030603x0022,0306030603x0011,030706030603x0022,030101030403x0011,030101030403x0021,031315031503x0011,031315031503x0021,x036,x0011,x036,x0012,",
                running: {
                    normal: "p[00,01,02,05,06,07,08,09,10,11,13,14,15,16,17,18,22]x00131,03x0035,0303x004,0303x0032,030300030503000000030903x0031,031010030306030000031203x0031,031008081003070300031403x0031,031008081110030505031403x0031,031008081111030404040603x0031,03100808110308030403030403x0030,031008081103050304020403040403x0014,x035,x009,03100808081103040404050216020403x0013,0305x044,x0310,10081103110304050604040202040403x0011,0306x044,050506060707070606050308111103080304050706040404060603x0010,030306x045,x059,060311030403040405030307050404040603x009,030605x048,x054,0404050308030404040507030003070503040403x009,030605x0414,050503x044,05070300000307060503x0010,03060504040503040505x046,050505x044,05050703000000030303x0011,0306050504040703x055,04050506060505040405060603x0018,0306060504040703x064,0505060607030505040403060703x0019,03030604040603x074,06060607070305050404030703x0021,0303050406030303x077,0306050404030703x0021,0306050403030000x038,07060504030603x0020,03030403030603x0010,0306050403060403x0019,030403030603x0011,0306040303030403x0020,0304030603x0010,030604030301030403x0021,031303060303x008,0304030101030603x0022,03150303060403x006,0306041303030603x0023,030300000313150300x034,06040315060603x0029,030303000313150404x035,x0034,x035,x00108,",
                    two: "p[00,02,05,06,07,08,09,10,11,13,14,15,16,17,18,22]x0087,02x0035,0202x004,0202x0032,020200020402000000020802x0031,020909020205020000021102x0031,020907070902060200021302x0031,020907071009020404021302x0031,020907071010020303030502x0031,02090707100207020302020302x0030,020907071002040203010302030302x0028,02090707071002030303040115010302x0014,x025,x009,0209071002100203040503030101030302x0012,0204x034,x0210,07101002070203040605030303050502x0011,0205x034,04040505060606050504050210020302030304020206040303030502x009,020205x035,x0410,0207020303030406020002060402030302x009,020504x038,x044,0303040402x034,04060200000206050402x0010,020504x0320,04040602000000020202x0011,02050403030402030404x036,04040403030405040502x0018,0205040403030602x045,03040405050404030405040502x0018,0205050403030602x054,0404050506020404030302050602x0019,02020503030502x064,0505050606020404030302050202x0021,02040305020202x067,02050403030205060502x0021,020302000000x029,050403020205050602x0019,02020302x0012,020303x024,0502x0019,0205020302x0012,0203030200020502x0019,02050202030202x0010,0205030200020502x0018,02050200000203050202x004,x024,0503020000020502x0018,0205020000000202121402000000021214030302000002120602x0018,020502x005,020202000000x025,000000021402x0020,020502x0019,02x0022,020502x0041,02121402x0041,020202x0029,",
                    three: "p[00,02,05,06,07,08,09,10,11,13,14,15,16,17,18,22]x0043,02x0035,0202x004,0202x0032,020200020402000000020802x0031,020909020205020000021102x0031,020907070902060200021302x0031,020907071009020404021302x0031,020907071010020303030502x0031,02090707100207020302020302x0030,020907071002040203010302030302x0028,02090707071002030303040115010302x0028,0209071002100203040503030101030302x0013,x025,x009,0207101002070203040605030303050502x0012,0204x034,x029,050210020302030304020206040303030502x0010,0205x034,04040505060606050504040207020303030406020002060402030302x009,020205x035,x0411,02x034,04060200000206050402x0010,020504x038,x044,x038,04040602000000020202x0011,020504x0320,04050602x0017,02050403030402030404x036,04040403030405040502x0018,0205040403030602x045,03040405050404030405050502x0018,0205050403030602x054,0404050506020404030402050602x0019,02020503030502x064,05050506060204040304020502x0020,020502040305020202x067,020504030304x025,x0017,020503020303020000x029,0504x037,02x0015,0205030202020302x0011,x028,0302x0014,020503020000020302x0014,020505020302x0014,02050302000000020302x0015,0202020302x0014,020502x005,020302x0014,02120302x0015,020502x005,020302x0014,02140202x0014,020502x007,020302x0013,0202020502x0013,020502x007,020302x0016,020502x0012,020502x007,020302x0016,02121402x0011,02121402x006,02121402x0016,020202x0012,020202x007,020202x0026,",
                    four: "p[00,02,05,06,07,08,09,10,11,13,14,15,16,17,18,22]x0043,02x0035,0202x004,0202x0032,020200020402000000020802x0031,020909020205020000021102x0031,020907070902060200021302x0031,020907071009020404021302x0031,020907071010020303030502x0031,02090707100207020302020302x0030,020907071002040203010302030302x0028,02090707071002030303040115010302x0014,x025,x009,0209071002100203040503030101030302x0012,0204x034,02x008,0207101002070203040605030303050502x0011,0205x034,0404x028,050210020302030304020206040303030502x009,020205x035,040505060606050504040207020303030406020002060402030302x009,020504x036,x0410,02x034,04060200000206050402x0010,020504x038,x044,x038,04040602000000020202x0011,020504x034,0404x0314,04050602x0017,02050404030304060204x036,04040403030405040502x0018,020504040303040602x044,03040405050404030405050502x0018,0205050403030402x054,0404050506020404030402020602x0019,020505030305020202x067,0204040303040402x0020,020205040305020000x028,0504x034,04020202x0017,02050205030302x009,02020204x037,02x0016,020302030302x0012,x028,0302x0015,020502030302x0013,02050502x004,020302x0013,020502020302x0014,020502x005,020302x0011,02020502020302x0015,020502x005,020302x0010,0214120200020302x0015,020502x006,021202x009,0202020000020302x0015,020502x006,021402x0013,020302x0016,020502x006,0202x0014,020302x0016,020502x0022,02121402x0015,02121402x0022,020202x0016,020202x0014,",
                    five: "p[00,02,05,06,07,08,09,10,11,13,14,15,16,17,18,22]x0043,02x0035,0202x004,0202x0032,020200020402000000020802x0031,020909020205020000021102x0031,020907070902060200021302x0031,020907071009020404021302x0031,020907071010020303030502x0031,02090707100207020302020302x0030,020907071002040203010302030302x0028,02090707071002030303040115010302x0014,x025,x009,0209071002100203040503030101030302x0012,0204x034,02x008,0207101002070203040605030303050502x0011,0205x034,0404x028,050210020302030304020206040303030502x009,020205x035,040505060606050504040207020303030406020002060402030302x009,020504x036,x0410,02x034,04060200000206050402x0010,020504x0311,04x038,04040602000000020202x0011,020504x035,040602x0312,04050602x0017,0205040403030304040602040403030304040403030405040502x0018,020504040303030406020505x044,05050404030405050502x0018,020505040303040606020606x054,06020404030304020602x0019,020505030305050202x067,0204040303040202x0020,020205040305020000x028,050403030402x0021,02050203030502x009,02020204030302x0020,02050203030502x0012,020204030302x0018,02050203030202x0013,020502040302x0017,020502030202x0015,02050202040302x0014,020205020302x0016,0205020000020402x0012,02020505020302x0016,020502x004,020302x0010,02141202020302x0016,020502x005,020302x0010,x024,0302x0016,020502x007,020302x0010,02141202x0017,020502x007,020302x0011,0202x0018,02121402x006,02121402x0031,020202x007,020202x008,",
                    six: "p[00,02,05,06,07,08,09,10,11,13,14,15,16,17,18,22]x0043,02x0035,0202x004,0202x0032,020200020402000000020802x0031,020909020205020000021102x0031,020907070902060200021302x0031,020907071009020404021302x0031,020907071010020303030502x0031,02090707100207020302020302x0030,020907071002040203010302030302x0028,02090707071002030303040115010302x0028,0209071002100203040503030101030302x0013,x025,x009,0207101002070203040605030303050502x0012,0204x034,x029,050210020302030304020206040303030502x0010,0205x034,04040505060606050504040207020303030406020002060402030302x009,020205x035,x0411,02x034,04060200000206050402x0010,020504x038,x044,x038,04040602000000020202x0011,020504x0320,04050602x0017,020504x035,050602x035,04040403030405040502x0018,02050404x034,050602040403040405050404030405050502x0018,0205050403030304060205050404050506020404030304020602x0019,020505030303040602060605050506060204040303040202x0021,0205040303050202x067,02050403030402x0022,0202050305020000x029,0404030402x0021,020203030302x0012,0204030402x0019,02020305020202x0013,02020302x0018,020203030202x0016,02020302x0016,020203030202x0017,0205020402x0015,0214120202x0018,020502020302x0016,0202x0016,x024,050200020302x0034,02141205020000020302x0034,x024,000000020302x0041,02121402x0041,020202x0013,"
                }
            },
            Scenery: {
                Star: "p[0,1]000000000011111111111100000000000000000000111111111111"
            },
            Particle: {
            }
        }
    };
}

/* tslint:enable max-line-length */