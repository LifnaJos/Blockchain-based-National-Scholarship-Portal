package main

import (
	"encoding/json"
	"fmt"

	"time"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type ApplicantContract struct {
	contractapi.Contract
}

type Applicant struct {
	ApplicantId   string    `json:"applicantId"`
	ApplicantName string    `json:"applicantName"`
	Dob           time.Time `json:"dob"`
	MobileNo      int64     `json:"mobileNo"`
	Address       string    `json:"address"`
	Ifsc          string    `json:"ifsc"`
	Pancard       string    `json:"pancard"`
	AnnualIncome  float64   `json:"annualIncome"`
	AadharNo      int64     `json:"aadharNo"`
}

// ApplicantExists returns true when asset with given ApplicantId exists in world state
func (c *ApplicantContract) ApplicantExists(ctx contractapi.TransactionContextInterface, ApplicantId string) (bool, error) {
	data, err := ctx.GetStub().GetState(ApplicantId)
	if err != nil {
		return false, err
	}
	return data != nil, nil
}

// CreateApplicant creates a new instance of Applicant
func (c *ApplicantContract) CreateApplicant(ctx contractapi.TransactionContextInterface, ApplicantId string, ApplicantName string, Dob time.Time, MobileNo int64, Address string, Ifsc string, Pancard string, AnnualIncome float64, AadharNo int64) error {
	exists, err := c.ApplicantExists(ctx, ApplicantId)
	if err != nil {
		return fmt.Errorf("could not read from world state. %s", err)
	} else if exists {
		return fmt.Errorf("the asset %s already exists", ApplicantId)
	}
	applicant := Applicant{
		ApplicantId:   ApplicantId,
		ApplicantName: ApplicantName,
		Dob:           Dob,
		MobileNo:      MobileNo,
		Address:       Address,
		Ifsc:          Ifsc,
		Pancard:       Pancard,
		AnnualIncome:  AnnualIncome,
		AadharNo:      AadharNo,
	}
	bytes, _ := json.Marshal(applicant)
	return ctx.GetStub().PutState(ApplicantId, bytes)
}

// ReadApplicant retrieves an instance of Applicant from the world state
func (c *ApplicantContract) ReadApplicant(ctx contractapi.TransactionContextInterface, ApplicantId string) (*Applicant, error) {
	exists, err := c.ApplicantExists(ctx, ApplicantId)
	if err != nil {
		return nil, fmt.Errorf("could not read from world state. %s", err)
	} else if !exists {
		return nil, fmt.Errorf("the asset %s does not exist", ApplicantId)
	}
	bytes, _ := ctx.GetStub().GetState(ApplicantId)
	applicant := new(Applicant)
	err = json.Unmarshal(bytes, applicant)
	if err != nil {
		return nil, fmt.Errorf("could not unmarshal world state data to type Applicant")
	}
	return applicant, nil
}

// UpdateApplicant retrieves an instance of Applicant from the world state and updates its value
func (c *ApplicantContract) UpdateApplicant(ctx contractapi.TransactionContextInterface, ApplicantId string, ApplicantName string, Dob time.Time, MobileNo int64, Address string, Ifsc string, Pancard string, AnnualIncome float64, AadharNo int64) error {
	exists, err := c.ApplicantExists(ctx, ApplicantId)
	if err != nil {
		return fmt.Errorf("could not read from world state. %s", err)
	} else if !exists {
		return fmt.Errorf("the asset %s does not exist", ApplicantId)
	}

	applicant := Applicant{
		ApplicantId:   ApplicantId,
		ApplicantName: ApplicantName,
		Dob:           Dob,
		MobileNo:      MobileNo,
		Address:       Address,
		Ifsc:          Ifsc,
		Pancard:       Pancard,
		AnnualIncome:  AnnualIncome,
		AadharNo:      AadharNo,
	}
	bytes, _ := json.Marshal(applicant)
	return ctx.GetStub().PutState(ApplicantId, bytes)
}

// DeleteApplicant deletes an instance of Applicant from the world state
func (c *ApplicantContract) DeleteApplicant(ctx contractapi.TransactionContextInterface, ApplicantId string) error {
	exists, err := c.ApplicantExists(ctx, ApplicantId)
	if err != nil {
		return fmt.Errorf("could not read from world state. %s", err)
	} else if !exists {
		return fmt.Errorf("the asset %s does not exist", ApplicantId)
	}
	return ctx.GetStub().DelState(ApplicantId)
}

// func main() {
// 	applicantContract := new(ApplicantContract)
// 	chaincode, err := contractapi.NewChaincode(applicantContract)
// 	if err != nil {
// 		panic("Could not create chaincode." + err.Error())
// 	}
// 	err = chaincode.Start()
// 	if err != nil {
// 		panic("Failed to start chaincode. " + err.Error())
// 	}
// }
