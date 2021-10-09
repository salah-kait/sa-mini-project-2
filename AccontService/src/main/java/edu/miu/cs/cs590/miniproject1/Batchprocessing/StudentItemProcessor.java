package edu.miu.cs.cs590.miniproject1.Batchprocessing;


import edu.miu.cs.cs590.miniproject1.Models.Student;
import edu.miu.cs.cs590.miniproject1.Models.TransformedStudent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.batch.item.ItemProcessor;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;

public class StudentItemProcessor implements ItemProcessor<Student, TransformedStudent> {

    private static final Logger log = LoggerFactory.getLogger(StudentItemProcessor.class);

    @Override
    public TransformedStudent process(final Student student) throws Exception {
        //Transform the date here
        String inputDate = "01/01/" + (LocalDateTime.now().getYear() - student.getAge()) + " 12:00:00 AM";
        Date transformedDate = new SimpleDateFormat("MM/dd/yyyy hh:mm:ss a").parse(inputDate);


        final TransformedStudent transformedStudent = new TransformedStudent(student.getFirstName(),
                student.getLastName(), student.getGpa(), transformedDate);

        log.info("Converting (" + student + ") into (" + transformedStudent + ")");

        return transformedStudent;
    }

}