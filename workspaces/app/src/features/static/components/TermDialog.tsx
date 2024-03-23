import { useState } from 'react'
import { apiStaticClient } from "../../../lib/api/apiClient";

const TermDialog: React.FC = () => {
  const [term, setTerm] = useState("")
  apiStaticClient.get("/assets/term.text").then((res) => {
    setTerm(res.data)
  })
  return <>
    {term}
  </>
}

const OverviewDialog: React.FC = () => {
  const [term, setTerm] = useState("")
  apiStaticClient.get("/assets/overview.text").then((res) => {
    setTerm(res.data)
  })
  return <>
    {term}
  </>
}


const QuestionDialog: React.FC = () => {
  const [term, setTerm] = useState("")
  apiStaticClient.get("/assets/question.text").then((res) => {
    setTerm(res.data)
  })
  return <>
    {term}
  </>
}

const CompanyDialog: React.FC = () => {
  const [term, setTerm] = useState("")
  apiStaticClient.get("/assets/company.text").then((res) => {
    setTerm(res.data)
  })
  return <>
    {term}
  </>
}

const ContactDialog: React.FC = () => {
  const [term, setTerm] = useState("")
  apiStaticClient.get("/assets/contact.text").then((res) => {
    setTerm(res.data)
  })
  return <>
    {term}
  </>
}


export  {TermDialog, CompanyDialog, ContactDialog, QuestionDialog, OverviewDialog };
