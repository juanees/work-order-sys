/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Clients = "clients",
	Products = "products",
	Users = "users",
	Workorders = "workorders",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string

// System fields
export type BaseSystemFields = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: { [key: string]: any }
}

export type AuthSystemFields = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields

// Record types for each collection

export type ClientsRecord = {
	name: string
	address: string
	phone: string
	owner: RecordIdString
}

export type ProductsRecord = {
	brand: string
	name: string
	owner: RecordIdString
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

export enum WorkordersStatusOptions {
	"BUDGETING" = "BUDGETING",
	"WAITING_RESPONSE" = "WAITING_RESPONSE",
	"WORKING" = "WORKING",
	"FINISHED" = "FINISHED",
	"CANCELED" = "CANCELED",
}
export type WorkordersRecord = {
	product: RecordIdString
	client: RecordIdString
	owner: RecordIdString
	status: WorkordersStatusOptions
	amount?: number
	failurereasons?: string
	comments?: string
}

// Response types include system fields and match responses from the PocketBase API
export type ClientsResponse = ClientsRecord & BaseSystemFields
export type ProductsResponse = ProductsRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields
export type WorkordersResponse = WorkordersRecord & BaseSystemFields

export type CollectionRecords = {
	clients: ClientsRecord
	products: ProductsRecord
	users: UsersRecord
	workorders: WorkordersRecord
}