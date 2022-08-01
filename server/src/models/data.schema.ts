import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

export type DataDocument = Data & Document;

@Schema()
export class Data {
    @Prop()
    resultTime: Date;
    @Prop()
    enodebId: string;
    @Prop()
    cellId: string;
    @Prop()
    availDur: number;
}
export const DataSchema = SchemaFactory.createForClass(Data)