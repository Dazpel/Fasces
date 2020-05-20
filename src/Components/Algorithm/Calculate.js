let x = [
    {
        name: 'Billy',
        balance: -15.75
    },
    {
        name: 'Alex',
        balance: 10.5
    },
    {
        name: 'Hugo',
        balance: 5.25
    }
]

for(let i = 0; i < x.length; i++)
{
    if( x[i].balance < 0 )
    {
        for(let j = 0; j < x.length; j++)
        {
            if(x[j].balance > 0)
            {
                if(x[j].balance >= (x[i].balance*-1))
                {
                    console.log(x[i].name + " should pay " + x[j].name + " $" + (x[i].balance*-1))
                    x[j].balance += x[i].balance
                    x[i].balance = 0;
                    break;
                }
                else 
                {
                    console.log(x[i].name + " should pay " + x[j].name + " $" + (x[j].balance))
                    x[i].balance += x[j].balance
                    x[j].balance = 0
                }
            }
        }
    }
    else
      {
        console.log(x[i].name + ' has paid!')
      }
}