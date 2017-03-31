export default function incrementAlphaNumeric(prev){

  let arr = prev.split('')
  let breaker = 0
  for (let i = arr.length-1 ; i >= 0 ; i-- ) {
    if (breaker) break
    let el = arr[i]

    // increment number
    if ( !!el.match(/[0-8]/) ) {
        arr[i] = parseInt(el) + 1
        breaker ++
    }
    // increment letter
    else if ( !!el.match(/[a-y]|[A-Y]/) ) {
        arr[i] = String.fromCharCode(el.charCodeAt() + 1)
        breaker ++
    }
    // increment through sets
    else if ( !!el.match(/9/) ) {
        arr[i] = "a"
        breaker ++
    }
    else if ( !!el.match(/z/) ) {
        arr[i] = "A"
        breaker ++
    }

    // switch element
    else if ( !!el.match(/Z/) ) {
      // restart
      arr[i] = 0
      // restart and add digit if all Zs (at ~14.75m permutations for 4 digits)
      if (i === 0) {
        arr = prev.split('')
        arr.push("000")
      }
    }

  }

  let next = arr.join('')
  console.log(next)
  return next

}
