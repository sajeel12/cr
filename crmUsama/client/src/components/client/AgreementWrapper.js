import React, { useEffect } from 'react'
import AgreementForm from './AgreementForm'
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAgreement } from '../../actions/agreementAction';
import { useSelector, useDispatch } from 'react-redux';
import AgreementWrapper1 from './AgreementWrapper1';


const AgreementWrapper = () => {



    // const params = useParams();
    // const params = new URLSearchParams(window.location.pathname);
    const [params] = useSearchParams();
    return (<>
        {/* <h3 > lead = {searchParams.get("id")} </h3> */}
        <AgreementWrapper1 params={params} />
        {/* <AgreementForm params={params} /> */}
    </>
    )
}


export default AgreementWrapper