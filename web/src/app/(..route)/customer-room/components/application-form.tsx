'use client'
import { SubjectedFormData, submitApplicationForm } from "@/app/business/consulting-room/application-form.service";
import { Card, CardContent, CardHeader } from "@/app/ui/component/molecule/card/card";
import Form from "@/app/ui/component/molecule/form/form-index";
import { FormState } from "@/app/ui/component/molecule/form/form-root";
import { FormSubmitButton } from "@/app/ui/component/molecule/form/form-submit-button";
import { FormTextInput } from "@/app/ui/component/molecule/form/form-textinput";

interface Customer{
  name: string;
  residentNumber: string;
  address: string;
}

interface Item{
  type: 'input'|'check';
  description: string; // description == label
}
interface Subject{
  title: string;
  items: Item[];
}
export interface ApplicationProps{
  title: string;
  customerInfo: Customer;
  subjects: Subject[];
}

export function ApplicationForm({formData}:{formData: ApplicationProps}){
  const { title } = formData;

  return(
    <main>
      <Card className="aspect-[16/9] overflow-y-auto px-6">
        <CardHeader className="text-center font-semibold">{title}</CardHeader>
        <CardContent className="text-start">
          {getForms(formData)}
        </CardContent>
      </Card>
    </main>
  )
}

function getForms(application: ApplicationProps){
  const {subjects} = application;

  function submit(prevState:FormState, formData:FormData):FormState{
    const value = formData.get('name')

    const requestData:SubjectedFormData[] = [];

    for(const subject of subjects){
      for(const item of subject.items){
        const data: SubjectedFormData = {section: subject.title, label: item.description, value:formData.get(`${item.description}${item.type}`) as string}
        requestData.push(data);
      }
    }

    submitApplicationForm(requestData).then((response)=>{
      console.log(response);
    })
  
    console.log('제출되었습니다.', value);
    alert('제출완료.')
    return{
      isSuccess: true,
      isFailure: false,
      message: '성공적으로 신청했습니다.',
      validationError:{}
    }
  };

  return (
    <>
    <Form id={"submit-form"} action={submit} failMessageControl={"alert"}>
      <div className="grid gird-rows-1">
        <p className="text-lg">고객정보</p>
        <hr className="my-3 border-t-2 border-gray-300" />
        <div className="grid gird-row-1 gap-2">
          <FormTextInput id={"name"} placeholder={"이름을 입력해주세요."} label="성명"/>
          <FormTextInput id={"resident-number"} placeholder={"주민번호를 입력해주세요."} label="주민번호"/>
          <FormTextInput id={"address"} placeholder={"주소를 입력해주세요."} label="주소"/>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
      {
        subjects.map((value, index)=>{
          {
            return (
            <main key={index} className="py-6">
            <p className="text-lg font-normal">{value.title}</p>
            <hr className="my-3 border-t-2 border-gray-300" />
            <div className="grid grid-cols-1 gap-2">
              {value.items.map((value, index)=>{
                return (
                <div key={index}>
                {
                  value.type=='input'
                  ?
                  <FormTextInput id={`${value.description}${value.type}`} placeholder={""} label={`${value.description}`}/>
                  :
                  <div className="flex space-x-3">
                    <div className="grid place-items-center">
                      <div className="text-sm font-medium">{value.description}</div>
                    </div>
                    <div className="grid place-items-center">
                      <input type="checkbox" className="h-3 w-3" id={`${value.description}${index}`}></input>
                    </div>
                  </div>
                }
                </div>
                )
              })}
            </div>
            </main>
            );
          }
        })
      }
      </div>
      <div><FormSubmitButton label={"제출"}/></div>
    </Form>
    </>
  );
}