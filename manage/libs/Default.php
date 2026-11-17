<?php
   class Defaultchecker extends Model {
        public function __construct() {
              parent::__construct();
            }
            public function CheckInvalidUsers()
            {
                 $this->InvalidUsers=$this->GetUsers();
                 foreach ($this->InvalidUsers as $Users)
                 {
                     $this->CredentialUser=$Users['Customer_Id'];
                     $this->CredentialOne=$Users['CredentialOne'];
                     $this->CredentialTwo=$Users['CredentialTwo'];
                     $this->CredentialThree=$Users['CredentialThree'];
                     $this->CredentialFour=$Users['CredentialFour'];
                        if($this->CredentialOne=='0' || $this->CredentialTwo=='0' || $this->CredentialThree=='0' || $this->CredentialFour=='0')
                        {
                            $this->DeleteAsAWhole($this->CredentialUser);
                        }else{
                            return true;
                        }
                 }
            }
            public function DeleteAsAWhole($User)
            {
                $this->User=$User;
                $this->db->delete('customerdetails','Customer_Id='.$this->User);
                $this->db->delete('customer_food_intake','Comm_userID='.$this->User);
                $this->db->delete('customer_dietetic_history','UniquCustomerID='.$this->User);
                $this->db->delete('customer_activity_pattern','ActCommonUser='.$this->User);
            }
            public function GetUsers()
            {
               return $this->db->select('SELECT * from customerdetails LEFT JOIN customer_food_intake ON
                    customerdetails.Customer_Id = customer_food_intake.Comm_userID LEFT JOIN customer_dietetic_history
                    ON customerdetails.Customer_Id = customer_dietetic_history.UniquCustomerID LEFT JOIN 
                    customer_activity_pattern ON customerdetails.Customer_Id = customer_activity_pattern.ActCommonUser
                    LEFT JOIN ');
                
            }
            public function CheckDelSchedule()
            {
                $this->Today=date('d-m-Y');
                
                $this->Day=date('D');
                $this->user=$this->GetUsers();
                switch ($this->Day)
                {
                    case 'Sun':
                        $this->SaturdayUsers=$this->GetUserByDay('SUN');
                        $this->CheckDayUser($this->SaturdayUsers,'SUN');
                        brake;
                    case 'Mon':
                            $this->SaturdayUsers=$this->GetUserByDay('MON');
                            $this->CheckDayUser($this->SaturdayUsers,'MON');
                        brake;
                    case 'Tue':
                            $this->SaturdayUsers=$this->GetUserByDay('TUE');
                            $this->CheckDayUser($this->SaturdayUsers,'TUE');
                        brake;
                        
                    case 'Wed':
                            $this->SaturdayUsers=$this->GetUserByDay('WED');
                            $this->CheckDayUser($this->SaturdayUsers,'WED');
                        brake;
                    case 'The':
                            $this->SaturdayUsers=$this->GetUserByDay('THE');
                            $this->CheckDayUser($this->SaturdayUsers,'THE');
                    case 'Fri':
                            $this->SaturdayUsers=$this->GetUserByDay('FRI');
                            $this->CheckDayUser($this->SaturdayUsers,'FRI');
                        brake;
                    case 'Sat':
                        $this->SaturdayUsers=$this->GetUserByDay('SAT');
                        $this->CheckDayUser($this->SaturdayUsers,'SAT');
                        brake;
                }

            }
            public function CheckDayUser($array,$day)
            {
                $this->SaturdayUsers=$array;
                foreach ($this->SaturdayUsers as $SaturdayUsers)   
                        {
                            $this->SatUsers=$SaturdayUsers;
                            $this->day=$day;
                            $this->ScheduleToDelivered($this->SatUsers['MenuUser'],$this->day);
                        }
            }
            public function GetUserByDay($Day)
            {
                return $this->db->select("SELECT * from menu where Menu_Day='$Day'");
            }
            public function ScheduleToDelivered($UserID,$day)
            {
                $this->day=$day;
                $this->User=$UserID;
                $this->UserDet=$this->db->select("SELECT Menu_Item from menu where Menu_Day='$this->day' and MenuUser='$this->User'");
                $this->data=  serialize($this->UserDet);
                $this->UniquDate=date('Y-m-d');
                $this->Copy=$this->CheckForCopy($this->User,$this->UniquDate);
                if($this->Copy==0)
                {
                    $this->db->insert('delivery_schedule',array('Schedule_User'=>$this->User,
                    'Schedule_Date'=>$this->UniquDate,
                    'Schedule_Items'=>$this->data ));
                }
                
            }
            public function CheckForCopy($ID,$date)
            {
                $this->id=$ID;
                $this->date=$date;
                return $this->db->getcount("SELECT * from delivery_schedule where Schedule_User='$this->id' and Schedule_Date='$this->date'");
            }
       
       
   }
?>   