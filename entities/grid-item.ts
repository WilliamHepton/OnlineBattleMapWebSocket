import { BattleImage } from './battle-image';

export interface GridItem {
    x: number;
    y: number;
    rows: number;
    cols: number;
    layerIndex?: number;
    dragEnabled?: boolean;
    resizeEnabled?: boolean;
    compactEnabled?: boolean;
    maxItemRows?: number;
    minItemRows?: number;
    maxItemCols?: number;
    minItemCols?: number;
    minItemArea?: number;
    maxItemArea?: number;
    [propName: string]: any;
    id: number;
    title: string;
    component: string;
    inputs: any;
}

export interface GridItemContent {
    id: number;
    battleImage: BattleImage;
    x: number;
    y: number;
    rows: number;
    cols: number;
}
