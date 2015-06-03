function make(obj) {
    return <test1 {...obj}/>; // should be OK
}
<test2 {...{}}/>; // should be OK
