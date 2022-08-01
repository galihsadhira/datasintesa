import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'
import { IntegerType } from "mongodb";

export type DataDocument = Data & Document;

@Schema()
export class Data {
    @Prop({required:true, default: Date.now})
    resultTime: Date;
    @Prop({required:true})
    enodebId: string;
    @Prop({required:true})
    cellId: string;
    @Prop({required:true})
    availDur: number;
}
export const DataSchema = SchemaFactory.createForClass(Data)