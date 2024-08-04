package main

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// OrganizationContract defines the Smart Contract structure
type OrganizationContract struct {
	contractapi.Contract
}

// Organization represents the data structure for an organization
type Organization struct {
	OrganizationId    string    `json:"OrganizationId"`
	OrganizationName  string    `json:"OrganizationName"`
	ScholarshipAmount float64   `json:"ScholarshipAmount"`
	FinancialYear     int       `json:"FinancialYear"`
	ScholarshipName   string    `json:"ScholarshipName"`
	IncomeCriteria    float64   `json:"IncomeCriteria"`
	AgeLimit          int       `json:"AgeLimit"`
	FieldofStudy      string    `json:"FieldofStudy"`
	HscScore          float64   `json:"HscScore"`
	SscScore          float64   `json:"SscScore"`
	Religion          string    `json:"Religion"`
	Caste             string    `json:"Caste"`
	StartDate         time.Time `json:"StartDate"`
	EndDate           time.Time `json:"EndDate"`
	OfficialUrl       string    `json:"OfficialUrl"`
}

// OrganizationExists returns true when an organization with the given ID exists in the world state
func (c *OrganizationContract) OrganizationExists(ctx contractapi.TransactionContextInterface, organizationId string) (bool, error) {
	data, err := ctx.GetStub().GetState(organizationId)
	if err != nil {
		return false, err
	}
	return data != nil, nil
}

// CreateOrganization creates a new instance of Organization
func (c *OrganizationContract) CreateOrganization(ctx contractapi.TransactionContextInterface, organizationId string, organizationName string, scholarshipAmount float64, financialYear int, scholarshipName string, incomeCriteria float64, ageLimit int, fieldofStudy string, hscScore float64, sscScore float64, religion string, caste string, startDate time.Time, endDate time.Time, officialUrl string) error {
	exists, err := c.OrganizationExists(ctx, organizationId)
	if err != nil {
		return fmt.Errorf("could not read from world state: %s", err)
	} else if exists {
		return fmt.Errorf("the organization %s already exists", organizationId)
	}

	organization := Organization{
		OrganizationId:    organizationId,
		OrganizationName:  organizationName,
		ScholarshipAmount: scholarshipAmount,
		FinancialYear:     financialYear,
		ScholarshipName:   scholarshipName,
		IncomeCriteria:    incomeCriteria,
		AgeLimit:          ageLimit,
		FieldofStudy:      fieldofStudy,
		HscScore:          hscScore,
		SscScore:          sscScore,
		Religion:          religion,
		Caste:             caste,
		StartDate:         startDate,
		EndDate:           endDate,
		OfficialUrl:       officialUrl,
	}
	bytes, err := json.Marshal(organization)
	if err != nil {
		return fmt.Errorf("could not marshal organization data: %s", err)
	}

	return ctx.GetStub().PutState(organizationId, bytes)
}

// ReadOrganization retrieves an instance of Organization from the world state
func (c *OrganizationContract) ReadOrganization(ctx contractapi.TransactionContextInterface, organizationId string) (*Organization, error) {
	exists, err := c.OrganizationExists(ctx, organizationId)
	if err != nil {
		return nil, fmt.Errorf("could not read from world state: %s", err)
	} else if !exists {
		return nil, fmt.Errorf("the organization %s does not exist", organizationId)
	}

	bytes, err := ctx.GetStub().GetState(organizationId)
	if err != nil {
		return nil, fmt.Errorf("could not retrieve data from world state: %s", err)
	}

	if bytes == nil {
		return nil, fmt.Errorf("no data found for the organization %s", organizationId)
	}

	organization := new(Organization)
	err = json.Unmarshal(bytes, organization)
	if err != nil {
		return nil, fmt.Errorf("could not unmarshal world state data to type Organization: %s", err)
	}

	return organization, nil
}

// UpdateOrganization retrieves an instance of Organization from the world state and updates its value
func (c *OrganizationContract) UpdateOrganization(ctx contractapi.TransactionContextInterface, organizationId string, organizationName string, scholarshipAmount float64, financialYear int, scholarshipName string, incomeCriteria float64, ageLimit int, fieldofStudy string, hscScore float64, sscScore float64, religion string, caste string, startDate time.Time, endDate time.Time, officialUrl string) error {
	exists, err := c.OrganizationExists(ctx, organizationId)
	if err != nil {
		return fmt.Errorf("could not read from world state: %s", err)
	} else if !exists {
		return fmt.Errorf("the organization %s does not exist", organizationId)
	}

	organization := Organization{
		OrganizationId:    organizationId,
		OrganizationName:  organizationName,
		ScholarshipAmount: scholarshipAmount,
		FinancialYear:     financialYear,
		ScholarshipName:   scholarshipName,
		IncomeCriteria:    incomeCriteria,
		AgeLimit:          ageLimit,
		FieldofStudy:      fieldofStudy,
		HscScore:          hscScore,
		SscScore:          sscScore,
		Religion:          religion,
		Caste:             caste,
		StartDate:         startDate,
		EndDate:           endDate,
		OfficialUrl:       officialUrl,
	}
	bytes, err := json.Marshal(organization)
	if err != nil {
		return fmt.Errorf("could not marshal organization data: %s", err)
	}

	return ctx.GetStub().PutState(organizationId, bytes)
}

// DeleteOrganization deletes an instance of Organization from the world state
func (c *OrganizationContract) DeleteOrganization(ctx contractapi.TransactionContextInterface, organizationId string) error {
	exists, err := c.OrganizationExists(ctx, organizationId)
	if err != nil {
		return fmt.Errorf("could not read from world state: %s", err)
	} else if !exists {
		return fmt.Errorf("the organization %s does not exist", organizationId)
	}

	return ctx.GetStub().DelState(organizationId)
}

// func main() {
// 	organizationContract := new(OrganizationContract)
// 	chaincode, err := contractapi.NewChaincode(organizationContract)
// 	if err != nil {
// 		panic("could not create chaincode: " + err.Error())
// 	}
// 	err = chaincode.Start()
// 	if err != nil {
// 		panic("failed to start chaincode: " + err.Error())
// 	}
// }
