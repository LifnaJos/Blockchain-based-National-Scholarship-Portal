package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type EIContract struct {
	contractapi.Contract
}
type EI struct {
	HEIid        string `json:"HEIid"`
	Regno        int    `json:"Regno"`
	TanNumber    string `json:"TanNumber"`
	PanNumber    string `json:"PanNumber"`
	MobileNumber string `json:"MobileNumber"`
	Email        string `json:"Email"`
	Collegename  string `json:"Collegename"`
	Address      string `json:"Address"`
	City         string `json:"City"`
	State        string `json:"State"`
}

// MEIExists returns true when asset with given ID exists in world state
func (c *EIContract) EIExists(ctx contractapi.TransactionContextInterface, heiID string) (bool, error) {
	data, err := ctx.GetStub().GetState(heiID)
	if err != nil {
		return false, err
	}
	return data != nil, nil
}

// CreateEI creates a new instance of EI
func (c *EIContract) CreateEI(ctx contractapi.TransactionContextInterface, heiID string, regNo int, tanNumber string, panNumber string, MobileNumber string, email string, collegeName string, address string, city string, state string) error {
	exists, err := c.EIExists(ctx, heiID)
	if err != nil {
		return fmt.Errorf("could not read from world state. %s", err)
	} else if exists {
		return fmt.Errorf("the asset %s already exists", heiID)
	}
	ei := EI{
		HEIid:        heiID,
		Regno:        regNo,
		TanNumber:    tanNumber,
		PanNumber:    panNumber,
		MobileNumber: MobileNumber,
		Email:        email,
		Collegename:  collegeName,
		Address:      address,
		City:         city,
		State:        state,
	}
	bytes, _ := json.Marshal(ei)

	return ctx.GetStub().PutState(heiID, bytes)
}

// ReadEI retrieves an instance of Institute from the world state
func (c *EIContract) ReadEI(ctx contractapi.TransactionContextInterface, heiID string) (*EI, error) {
	exists, err := c.EIExists(ctx, heiID)
	if err != nil {
		return nil, fmt.Errorf("could not read from world state. %s", err)
	} else if !exists {
		return nil, fmt.Errorf("the asset %s does not exist", heiID)
	}
	bytes, _ := ctx.GetStub().GetState(heiID)
	ei := new(EI)
	err = json.Unmarshal(bytes, ei)
	if err != nil {
		return nil, fmt.Errorf("could not unmarshal world state data to type ei")
	}
	return ei, nil
}

// UpdateEI retrieves an instance of Institute from the world state and updates its value
func (c *EIContract) UpdateEI(ctx contractapi.TransactionContextInterface, heiID string, regNo int, tanNumber string, panNumber string, MobileNumber string, email string, collegeName string, address string, city string, state string) error {
	exists, err := c.EIExists(ctx, heiID)
	if err != nil {
		return fmt.Errorf("could not read from world state. %s", err)
	} else if !exists {
		return fmt.Errorf("the asset %s does not exist", heiID)
	}
	ei := EI{
		HEIid:        heiID,
		Regno:        regNo,
		TanNumber:    tanNumber,
		PanNumber:    panNumber,
		MobileNumber: MobileNumber,
		Email:        email,
		Collegename:  collegeName,
		Address:      address,
		City:         city,
		State:        state,
	}

	bytes, _ := json.Marshal(ei)
	return ctx.GetStub().PutState(heiID, bytes)
}

// DeleteEI deletes an instance of Institute from the world state
func (c *EIContract) DeleteEI(ctx contractapi.TransactionContextInterface, heiID string) error {
	exists, err := c.EIExists(ctx, heiID)
	if err != nil {
		return fmt.Errorf("could not read from world state. %s", err)
	} else if !exists {
		return fmt.Errorf("the asset %s does not exist", heiID)
	}
	return ctx.GetStub().DelState(heiID)
}

// func main() {
// 	eiContract := new(EIContract)
// 	chaincode, err := contractapi.NewChaincode(eiContract)
// 	if err != nil {
// 		panic("Could not create chaincode." + err.Error())
// 	}
// 	err = chaincode.Start()
// 	if err != nil {
// 		panic("Failed to start chaincode. " + err.Error())
// 	}
// }
