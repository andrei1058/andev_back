import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Resource {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    version: string
    @Column()
    title: string
    @Column("text")
    description: string

    constructor(title: string, description: string, version: string) {
        this.id = 0;
        this.version = version;
        this.title = title;
        this.description = description;
    }

    setVersion(nextCandidate: string) {
        this.version = nextCandidate;
        return this;
    }
}