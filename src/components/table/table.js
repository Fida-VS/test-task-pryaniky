import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../store/post-slice';
import { editPost } from '../../store/post-slice';
import { Button, ButtonGroup, Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';



export const MyTable = ({
	id,
	companySigDate,
	companySignatureName,
	documentName,
	documentStatus,
	documentType,
	employeeNumber,
	employeeSigDate,
	employeeSignatureName,
}) => {
	const [isEditing, setIsEditing] = useState(false);

	const [companySigDateValue, setCompanySigDateValue] = useState(companySigDate);
	const [companySignatureNameValue, setCompanySignatureNameValue] =
		useState(companySignatureName);
	const [documentNameValue, setDocumentNameValue] = useState(documentName);
	const [documentStatusValue, setDocumentStatusValue] = useState(documentStatus);
	const [documentTypeValue, setDocumentTypeValue] = useState(documentType);
	const [employeeNumberValue, setEmployeeNumberValue] = useState(employeeNumber);
	const [employeeSigDateValue, setEmployeeSigDateValue] = useState(employeeSigDate);
	const [employeeSignatureNameValue, setEmployeeSignatureNameValue] =
		useState(employeeSignatureName);




	const onInputChange1 = ({ target }) => setCompanySigDateValue(target.value);
	const onInputChange2 = ({ target }) => setCompanySignatureNameValue(target.value);
	const onInputChange3 = ({ target }) => setDocumentNameValue(target.value);
	const onInputChange4 = ({ target }) => setDocumentStatusValue(target.value);
	const onInputChange5 = ({ target }) => setDocumentTypeValue(target.value);
	const onInputChange6 = ({ target }) => setEmployeeNumberValue(target.value);
	const onInputChange7 = ({ target }) => setEmployeeSigDateValue(target.value);
	const onInputChange8 = ({ target }) => setEmployeeSignatureNameValue(target.value);

	const token = useSelector(state => state.user.token);

	const dispatch = useDispatch();

	const onPostEdit = () => {
		setIsEditing(true);
	};

	const post = {
		companySigDate: companySigDateValue,
		companySignatureName: companySignatureNameValue,
		documentName: documentNameValue,
		documentStatus: documentStatusValue,
		documentType: documentTypeValue,
		employeeNumber: employeeNumberValue,
		employeeSigDate: employeeSigDateValue,
		employeeSignatureName: employeeSignatureNameValue,
	}

	const saveChanges = (id) => {

		dispatch(editPost([token, id, post]))
		setIsEditing(false);
	};

	


	const buttonSave = isEditing ? (
		<>
		 <Button type="button" onClick={() => saveChanges(id)}>
					Save
				</Button>
		</>
	  ) : null;

	
	return !isEditing ? (
		<Container sx={{marginTop: '2rem', marginBottom: '2rem'}}>
			<ButtonGroup variant="outlined" aria-label="Basic button group">
			<Button type="button" onClick={onPostEdit}>
					Edit
				</Button>
				{buttonSave}
				<Button variant='outlined' type="button" onClick={() => dispatch(deletePost({token, id}))}>
					X
				</Button>
				</ButtonGroup>
				<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
				<TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                Company sig date
                            </TableCell>
                            <TableCell align="right">
                                {companySigDateValue.substring(0, 16).replace('T', ' ')}
                            </TableCell>
                        </TableRow>

                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                Company signature name
                            </TableCell>
                            <TableCell align="right">
                                {companySignatureNameValue}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell component="th" scope="row">
                                Document name
                            </TableCell>
                            <TableCell align="right">
                                {documentNameValue}
                            </TableCell>
                        </TableRow>

                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                Document status
                            </TableCell>
                            <TableCell align="right">
                                {documentStatusValue}
                            </TableCell>
                        </TableRow>

                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                Document type
                            </TableCell>
                            <TableCell align="right">
                                {documentTypeValue}
                            </TableCell>
                        </TableRow>

                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                Employee number
                            </TableCell>
                            <TableCell align="right">
                                {employeeNumberValue}
                            </TableCell>
                        </TableRow>

                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                Employee sig date
                            </TableCell>
                            <TableCell align="right">
                                {employeeSigDateValue.substring(0, 16).replace('T', ' ')}
                            </TableCell>
                        </TableRow>

                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                Employee signature name
                            </TableCell>
                            <TableCell align="right">
                                {employeeSignatureNameValue}
                            </TableCell>
                        </TableRow>
                    </TableBody>

				</Table>
			</TableContainer>
		</Container>
		) : (
			<Container sx={{marginTop: '2rem', marginBottom: '2rem'}}>
				<ButtonGroup variant="outlined" aria-label="Basic button group">
				<Button type="button" onClick={onPostEdit}>
					Edit
				</Button>
				{buttonSave}
				
				</ButtonGroup>
				<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
				<TableBody>
						<TableRow
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								Company sig date
							</TableCell>
							<TableCell align="right">
								<TextField
								fullWidth
								id="fullWidth"
									size="small"
									type="date"
									name="CompanySigDate"
									value={companySigDateValue}
									onChange={onInputChange1}
								/>
							</TableCell>
						</TableRow>

						<TableRow
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								Company signature name
							</TableCell>
							<TableCell align="right">
								<TextField
									size="small"
									fullWidth
								id="fullWidth"
									type="text"
									name="CompanySignatureName"
									value={companySignatureNameValue}
									onChange={onInputChange2}
								/>
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell component="th" scope="row">
								Document name
							</TableCell>
							<TableCell align="right">
								<TextField
								fullWidth
								id="fullWidth"
									size="small"
									type="text"
									name="DocumentName"
									value={documentNameValue}
									onChange={onInputChange3}
								/>
							</TableCell>
						</TableRow>

						<TableRow
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								Document status
							</TableCell>
							<TableCell align="right">
								<TextField
								fullWidth
								id="fullWidth"
									size="small"
									type="text"
									name="DocumentStatusValue"
									value={documentStatusValue}
									onChange={onInputChange4}
								/>
							</TableCell>
						</TableRow>

						<TableRow
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								Document type
							</TableCell>
							<TableCell align="right">
								<TextField
								fullWidth
								id="fullWidth"
									size="small"
									type="text"
									name="DocumentTypeValue"
									value={documentTypeValue}
									onChange={onInputChange5}
								/>
							</TableCell>
						</TableRow>

						<TableRow
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								Employee number
							</TableCell>
							<TableCell align="right">
								<TextField
								fullWidth
								id="fullWidth"
									size="small"
									type="text"
									name="EmployeeNumberValue"
									value={employeeNumberValue}
									onChange={onInputChange6}
								/>
							</TableCell>
						</TableRow>

						<TableRow
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								Employee sig date
							</TableCell>
							<TableCell align="right">
								<TextField
								fullWidth
								id="fullWidth"
									size="small"
									type="date"
									name="EmployeeSigDateValue"
									value={employeeSigDateValue}
									onChange={onInputChange7}
								/>
							</TableCell>
						</TableRow>

						<TableRow
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								Employee signature name
							</TableCell>
							<TableCell align="right">
								<TextField
								fullWidth
								id="fullWidth"
									size="small"
									type="text"
									name="EmployeeSignatureNameValue"
									value={employeeSignatureNameValue}
									onChange={onInputChange8}
								/>
							</TableCell>
						</TableRow>
					</TableBody>
			</Table>
			</TableContainer>
		</Container>
		)
	
};
