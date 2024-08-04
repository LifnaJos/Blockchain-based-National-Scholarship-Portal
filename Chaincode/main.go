package main

import (
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

func main() {
	organizationContract := new(OrganizationContract)
	eiContract := new(EIContract)
	applicantContract := new(ApplicantContract)

	chaincode, err := contractapi.NewChaincode(organizationContract, eiContract, applicantContract)
	if err != nil {
		panic("Could not create chaincode: " + err.Error())
	}

	err = chaincode.Start()
	if err != nil {
		panic("Failed to start chaincode: " + err.Error())
	}

}
